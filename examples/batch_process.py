#!/usr/bin/env python3
"""
CogniScribe Batch Processing Script

Process multiple lecture recordings in one go!
Great for processing an entire semester of recorded lectures.

Usage:
    # Process all MP3 files in a folder
    python batch_process.py ~/Lectures/Semester1/
    
    # Process specific files with custom settings
    python batch_process.py --subject anatomy --ratio 0.2 lecture*.mp3
"""

import argparse
import json
import sys
from pathlib import Path
from typing import List, Optional
import time

import requests
from tqdm import tqdm


class CogniScribeBatchClient:
    """Client for batch processing multiple audio files."""
    
    def __init__(self, base_url: str = "http://localhost:8080"):
        self.base_url = base_url.rstrip("/")
        self.api_url = f"{self.base_url}/api"
    
    def process_file(self, 
                     audio_file: Path,
                     ratio: float = 0.15,
                     subject: Optional[str] = None) -> dict:
        """Process a single audio file."""
        params = {"ratio": ratio}
        if subject:
            params["subject"] = subject
        
        with open(audio_file, "rb") as f:
            files = {"file": (audio_file.name, f, "audio/mpeg")}
            response = requests.post(
                f"{self.api_url}/pipeline",
                params=params,
                files=files,
                timeout=600  # 10 minute timeout for long lectures
            )
        
        response.raise_for_status()
        return response.json()
    
    def process_batch(self,
                      audio_files: List[Path],
                      output_dir: Path,
                      ratio: float = 0.15,
                      subject: Optional[str] = None) -> dict:
        """
        Process multiple audio files.
        
        Returns:
            Dictionary with success/failure counts and results
        """
        results = {
            "total": len(audio_files),
            "successful": 0,
            "failed": 0,
            "files": []
        }
        
        output_dir.mkdir(parents=True, exist_ok=True)
        
        # Create a summary file
        summary_path = output_dir / "_batch_summary.json"
        
        for audio_file in tqdm(audio_files, desc="Processing lectures"):
            file_result = {
                "filename": audio_file.name,
                "path": str(audio_file),
                "status": "pending"
            }
            
            try:
                # Process the file
                result = self.process_file(audio_file, ratio, subject)
                
                if result.get("success"):
                    # Create output subdirectory for this file
                    file_output_dir = output_dir / audio_file.stem
                    file_output_dir.mkdir(exist_ok=True)
                    
                    # Save transcript
                    with open(file_output_dir / "transcript.txt", "w") as f:
                        f.write(result["transcript"]["text"])
                    
                    # Save summary
                    with open(file_output_dir / "study_notes.md", "w") as f:
                        f.write(f"# {audio_file.stem}\n\n")
                        f.write(result["summary"])
                    
                    # Save full result
                    with open(file_output_dir / "full_result.json", "w") as f:
                        json.dump(result, f, indent=2)
                    
                    file_result["status"] = "success"
                    file_result["duration"] = result["metadata"]["duration"]
                    file_result["language"] = result["metadata"]["language"]
                    file_result["output_dir"] = str(file_output_dir)
                    results["successful"] += 1
                else:
                    file_result["status"] = "failed"
                    file_result["error"] = result.get("message", "Unknown error")
                    results["failed"] += 1
                    
            except Exception as e:
                file_result["status"] = "failed"
                file_result["error"] = str(e)
                results["failed"] += 1
            
            results["files"].append(file_result)
            
            # Save summary after each file (in case of interruption)
            with open(summary_path, "w") as f:
                json.dump(results, f, indent=2)
        
        return results


def find_audio_files(paths: List[Path]) -> List[Path]:
    """Find all audio files from given paths (files or directories)."""
    audio_extensions = {".mp3", ".wav", ".m4a", ".flac", ".ogg", ".aac", ".wma"}
    audio_files = []
    
    for path in paths:
        if path.is_file() and path.suffix.lower() in audio_extensions:
            audio_files.append(path)
        elif path.is_dir():
            for ext in audio_extensions:
                audio_files.extend(path.glob(f"*{ext}"))
                audio_files.extend(path.glob(f"*{ext.upper()}"))
    
    return sorted(set(audio_files))


def print_summary(results: dict):
    """Print a nice summary of batch processing results."""
    print("\n" + "="*60)
    print("BATCH PROCESSING SUMMARY")
    print("="*60)
    print(f"Total files: {results['total']}")
    print(f"✅ Successful: {results['successful']}")
    print(f"❌ Failed: {results['failed']}")
    
    if results['failed'] > 0:
        print("\nFailed files:")
        for file_result in results['files']:
            if file_result['status'] == 'failed':
                print(f"  - {file_result['filename']}: {file_result.get('error', 'Unknown')}")
    
    print("\nSuccessful files:")
    total_duration = 0
    for file_result in results['files']:
        if file_result['status'] == 'success':
            duration = file_result.get('duration', 0)
            total_duration += duration
            print(f"  ✅ {file_result['filename']} ({duration:.1f}s)")
    
    if total_duration > 0:
        print(f"\nTotal audio processed: {total_duration:.1f} seconds ({total_duration/60:.1f} minutes)")


def main():
    parser = argparse.ArgumentParser(
        description="CogniScribe Batch Processor - Process multiple lectures at once",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Process all audio in a folder
  python batch_process.py ~/Lectures/Anatomy/
  
  # Process specific files
  python batch_process.py lecture1.mp3 lecture2.mp3 lecture3.mp3
  
  # Process with custom settings
  python batch_process.py --subject pharmacology --ratio 0.25 ~/Lectures/*.mp3
        """
    )
    
    parser.add_argument(
        "paths",
        type=Path,
        nargs="+",
        help="Audio files or directories to process"
    )
    
    parser.add_argument(
        "--url",
        default="http://localhost:8080",
        help="CogniScribe API URL (default: http://localhost:8080)"
    )
    
    parser.add_argument(
        "--ratio",
        type=float,
        default=0.15,
        help="Summary length ratio, 0.05-1.0 (default: 0.15)"
    )
    
    parser.add_argument(
        "--subject",
        help="Subject/topic for all files (e.g., 'anatomy', 'pharmacology')"
    )
    
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("batch_output"),
        help="Output directory (default: ./batch_output)"
    )
    
    args = parser.parse_args()
    
    # Validate ratio
    if not 0.05 <= args.ratio <= 1.0:
        print("❌ Error: ratio must be between 0.05 and 1.0")
        sys.exit(1)
    
    # Find all audio files
    print("Searching for audio files...")
    audio_files = find_audio_files(args.paths)
    
    if not audio_files:
        print("❌ No audio files found!")
        sys.exit(1)
    
    print(f"Found {len(audio_files)} audio file(s)")
    for f in audio_files:
        print(f"  - {f.name}")
    
    # Confirm before processing
    print(f"\nSettings:")
    print(f"  API URL: {args.url}")
    print(f"  Ratio: {args.ratio}")
    if args.subject:
        print(f"  Subject: {args.subject}")
    print(f"  Output: {args.output}")
    
    response = input("\nProceed with batch processing? [y/N]: ")
    if response.lower() not in ('y', 'yes'):
        print("Cancelled.")
        sys.exit(0)
    
    # Initialize client and process
    client = CogniScribeBatchClient(args.url)
    
    print(f"\n🚀 Starting batch processing...")
    start_time = time.time()
    
    try:
        results = client.process_batch(
            audio_files,
            args.output,
            ratio=args.ratio,
            subject=args.subject
        )
        
        elapsed = time.time() - start_time
        
        print_summary(results)
        print(f"\nProcessing completed in {elapsed:.1f} seconds")
        print(f"\nResults saved to: {args.output}")
        print(f"Summary file: {args.output / '_batch_summary.json'}")
        
    except KeyboardInterrupt:
        print("\n\n⚠️  Processing interrupted by user")
        print(f"Partial results saved to: {args.output}")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    try:
        import tqdm
    except ImportError:
        print("❌ Error: tqdm is required for batch processing")
        print("Install with: pip install tqdm")
        sys.exit(1)
    
    main()
