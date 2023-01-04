#!/usr/bin/env bash

# Is BGPScanner there?
if ! which bgpscanner; then
  echo "bgpscanner not found! Exiting..."
  exit 1
fi

# ASNs to search
ASNS=(
  "57976"
  "6507"
  "46555"
  "395856"
)

# Using BGPScanner, filter the ribs entries then append to a pre-existing file
# This function takes three argument:
# 1. The ASN
# 2. The RIB file path
# 2. The output file path
function filter_rib_entries() {
  eval '$(bgpscanner -p "$1$" $2 > $3)'
}

# Create folders and output files to write in
for asn in "${ASNS[@]}"; do
  mkdir "./data/AS$asn"
  echo "Folder for AS$asn created"

  touch "./data/AS$asn/AS$asn.output.txt"
  echo "Output file for AS$asn created"
done

# For each compressed file in the data folder...
for file in ./data/*.bz2; do
  filename="$(basename "$file")"

  # Filter the RIB entries for every ASN in the ASNS array
  # (This step can take hours, since BGPScanner works with Brute Force Searching)
  for asn in "${ASNS[@]}"; do
    echo "Filtering from $filename for $asn"
    filter_rib_entries "$asn" "$file" "./data/AS$asn/AS$asn.output.txt"
  done
done
