#!/usr/bin/env bash
set -eu

commandAssert ( ) {
  if  ! command -v "$1" &>/dev/null ;
   then
     echo "error: command $1 doesn't exist"
     exit 69
   fi
}

main ( ) {
  if [[ $# -lt 2 ]] ;
   then
     echo 2>&1 "Usage: $(basename $0) <inputDirectory> <outputDirectory>"
     echo 2>&1 ""
     echo 2>&1 "  The command takes all files in the inputDirectory, converts .PNGs to .WEBP and stores the result"
     echo 2>&1 "  in the outputDirectory. Both inputDirectory and outputDirectory must exist."
     echo 2>&1 "  Typically you would use the command as follows:"
     echo 2>&1 "  ./png2webp-dir.sh ../png/images/ ../assets/images/"
     exit 64
  fi

  commandAssert find
  commandAssert cwebp

  SOURCE_DIR="$1"
  OUT_DIR="$2"

  PNG_FILES=$(find $SOURCE_DIR -type f -name "*.png")
  ./png2webp.sh "$PNG_FILES" "$OUT_DIR"
}

main "$@"
