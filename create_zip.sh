#!/bin/bash
mkdir trumpit_release
cp -p *.json trumpit_release
cp -p *.js trumpit_release
cp -pr data trumpit_release
cp -pr images trumpit_release
zip trumpit_release trumpit_release
rm -rf trumpit_release
