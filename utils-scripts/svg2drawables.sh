#!/usr/bin/env bash
set -e

#--------------------------------------------------------------------------------------------------
commandAssert ( ) {
  if  ! command -v "$1" &>/dev/null ;
   then
     echo "error: command $1 doesn't exist"
     exit 69
   fi
}
#--------------------------------------------------------------------------------------------------
processOne ( ) {
  if ! [[ -f  "$1"  ]] ; then  echo  2>&1 "error: file $1 doesn't exist"  ; exit 65 ; fi

  FILE="$1"
  OUT="$2"
  IMGSIZE="$(identify "$FILE" | rev | cut -d " " -f7 | rev)"
  mkdir -p "$OUT"
  if [[ $IMGSIZE =~ ([0-9]+)x([0-9]+) ]] ;
   then
     rsvg-convert -w "$(bc -l <<< "${BASH_REMATCH[1]}" | awk '{print int($1)}')" \
                  -h "$(bc -l <<< "${BASH_REMATCH[2]}" | awk '{print int($1)}')" \
                  -a "$FILE" \
                  -o "$OUT/$(basename -s .svg "$FILE").png"
     rsvg-convert -w "$(bc -l <<< "${BASH_REMATCH[1]}"*1.5 | awk '{print int($1)}')" \
                  -h "$(bc -l <<< "${BASH_REMATCH[2]}"*1.5 | awk '{print int($1)}')" \
                  -a "$FILE" \
                  -o "$OUT/$(basename -s .svg "$FILE")@1.5.png"
     rsvg-convert -w "$(bc -l <<< "${BASH_REMATCH[1]}"*2 | awk '{print int($1)}')" \
                  -h "$(bc -l <<< "${BASH_REMATCH[2]}"*2 | awk '{print int($1)}')" \
                  -a "$FILE" \
                  -o "$OUT/$(basename -s .svg "$FILE")@2.png"
     rsvg-convert -w "$(bc -l <<< "${BASH_REMATCH[1]}"*3 | awk '{print int($1)}')" \
                  -h "$(bc -l <<< "${BASH_REMATCH[2]}"*3 | awk '{print int($1)}')" \
                  -a "$FILE" \
                  -o "$OUT/$(basename -s .svg "$FILE")@3.png"
     echo "done: $FILE was converted to $OUT/$(basename -s .svg "$FILE").png in 4 variants - base, @1.5, @2, @3"
   else
     echo 2>&1  "error: couldn't get image $FILE size"
   fi
}
#--------------------------------------------------------------------------------------------------
main ( ) {
  if [[ $# -lt 2 ]] ;
   then
     echo 2>&1 "Usage: $(basename $0) <inputFile/inputDirectory> <outputDirectory>"
     echo 2>&1 ""
     echo 2>&1 "  The command takes all files in the inputDirectory, converts to .PNGs and stores the result"
     echo 2>&1 "  in the outputDirectory. Both inputDirectory and outputDirectory must exist. The command can also"
     echo 2>&1 "  accept a single file on input instead of a directory."
     exit 64
   fi

  commandAssert  identify
  commandAssert  bc
  commandAssert  rsvg-convert

  SRC="$1"
  OUTDIR="$2"

  if [[ -d "$SRC" ]] ;
   then
     find "$SRC" -name "*.svg" | while read x ;
      do
        processOne "$x" "$OUTDIR"
      done
   else
     processOne "$SRC" "$OUTDIR"
   fi
}
#--------------------------------------------------------------------------------------------------
main "$@"



