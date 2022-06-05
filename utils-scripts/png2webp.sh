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
     echo 2>&1 "Usage: $(basename $0) <inputFiles> <outputDirectory>"
     echo 2>&1 ""
     echo 2>&1 "  The command takes a list of files, converts images to .WEBP and stores the result"
     echo 2>&1 "  in the outputDirectory. Both inputFiles and outputDirectory must exist."
     echo 2>&1 "  Typically you would use the command as follows:"
     echo 2>&1 "  ./png2webp.sh ../png/images/icon_fb.png ../png/images/icon_ig.jpg ../assets/images/"
     exit 64
  fi

  commandAssert find
  commandAssert cwebp
  commandAssert sed

  SOURCE_FILES="${*%${!#}}"
  OUT_DIR="${@:$#}"

  for FILE in $SOURCE_FILES; do
    # Fix double slashes
    FILE_PATH=$(echo $FILE | sed "s#//#/#g")
#    echo "Converting $FILE_PATH"
  #  echo "Out dir $OUT_DIR"
    FILE_NAME=$(echo $FILE_PATH | sed -r "s/(.*)\/(.*)$/\2/g")
#    echo "File name $FILE_NAME"
    FILE_NAME_WITHOUT_EXTENSION=$(echo $FILE_NAME | sed "s/\..*$//")
    # Assemble output path and fix double slashes
    OUT_PATH_WEBP=$(echo "$OUT_DIR/$FILE_NAME_WITHOUT_EXTENSION.webp" | sed "s#//#/#g")
#    echo "Out path $OUT_PATH_WEBP"
    echo "Converting $FILE_PATH -> $OUT_PATH_WEBP"
    cwebp -quiet -q 80 -m 6 "$(pwd)/${FILE_PATH}" -o "${OUT_PATH_WEBP}"
  done
}

main "$@"
