#!/bin/bash

# HealthScore AI - Complete Project Generator
# This script creates all files from Figma Make on your Mac

echo "=================================="
echo "  HealthScore AI Setup Script"
echo "=================================="
echo ""

# Check if we're in the right location
echo "This script will create the HealthScore AI project in: $(pwd)/healthscore-ai"
echo ""
read -p "Is this the correct location? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Please cd to your desired location (e.g., cd ~/Desktop) and run this script again"
    exit 1
fi

# Create project directory
echo "Creating project directory..."
mkdir -p healthscore-ai
cd healthscore-ai

# Create directory structure
echo "Creating directory structure..."
mkdir -p src/app/pages
mkdir -p src/app/components/ui
mkdir -p src/app/components/figma
mkdir -p src/app/config
mkdir -p src/app/utils
mkdir -p src/styles
mkdir -p public
mkdir -p guidelines

echo ""
echo "✅ Directory structure created!"
echo ""
echo "📁 Project structure:"
echo "   healthscore-ai/"
echo "   ├── src/"
echo "   │   ├── app/"
echo "   │   │   ├── pages/"
echo "   │   │   ├── components/"
echo "   │   │   │   ├── ui/"
echo "   │   │   │   └── figma/"
echo "   │   │   ├── config/"
echo "   │   │   └── utils/"
echo "   │   └── styles/"
echo "   ├── public/"
echo "   └── guidelines/"
echo ""
echo "=================================="
echo "  IMPORTANT: Next Steps"
echo "=================================="
echo ""
echo "The folder structure is ready!"
echo ""
echo "Since Figma Make doesn't have an export button, you have 2 options:"
echo ""
echo "Option 1 (RECOMMENDED): I'll provide all file contents"
echo "   - Tell me 'create all files' in the chat"
echo "   - I'll give you each file's content"
echo "   - You copy-paste into the correct location"
echo ""
echo "Option 2: Manual creation"
echo "   - Open each file in Figma Make"
echo "   - Copy the code"
echo "   - Create file on Mac with same name"
echo "   - Paste content"
echo ""
echo "Your project folder is at:"
echo "$(pwd)"
echo ""
echo "Next: Tell me in the chat which option you prefer!"
echo ""
