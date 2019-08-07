#!/bin/bash
mkdir ipfs
cd ipfs
wget https://dist.ipfs.io/go-ipfs/v0.4.21/go-ipfs_v0.4.21_darwin-amd64.tar.gz -O go-ipfs_v0.4.21_darwin-amd64.tar.gz
tar -xzf go-ipfs_v0.4.21_darwin-amd64.tar.gz
cd go-ipfs
chmod +x install.sh
./install.sh
cd ..
rm -r go-ipfs_v0.4.21_darwin-amd64.tar.gz
ipfs init
ipfs daemon