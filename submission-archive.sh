#!/bin/bash

# Exit on any error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
TEMP_DIR="submission_temp"
ARCHIVE_NAME="FE-2024-12-i-task-2-companies-app.tar.gz"

# Directories to exclude from archive
EXCLUDE_DIRS=(
    "node_modules"
    ".next"
    ".git"
    "dist"
    "build"
    ".cache"
    ".idea"
    "coverage"
    ".nyc_output"
    "logs"
    "*.log"
    ".DS_Store"
    "Thumbs.db"
    "submission_temp"
    "*_temp"
    "*.tar.gz"
)

echo -e "${YELLOW}Starting project submission archive process...${NC}"

# Step 1: Check if we're in a project directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Warning: No package.json found. Are you in the correct directory?${NC}"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Aborted.${NC}"
        exit 0
    fi
fi

# Step 2: Create temporary directory
echo -e "${YELLOW}Preparing temporary directory...${NC}"
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Step 3: Copy all project files except excluded directories
echo -e "${YELLOW}Copying project files (excluding node_modules, .next, etc.)...${NC}"

# Build tar exclude options (including the temp directory itself)
EXCLUDE_OPTS=""
for exclude in "${EXCLUDE_DIRS[@]}"; do
    EXCLUDE_OPTS="$EXCLUDE_OPTS --exclude=$exclude"
done
# Also exclude our temporary directory to prevent recursion
EXCLUDE_OPTS="$EXCLUDE_OPTS --exclude=$TEMP_DIR"

# Copy everything except excluded items to temp directory
if tar $EXCLUDE_OPTS -cf - . | (cd "$TEMP_DIR" && tar -xf -); then
    echo -e "${GREEN}Project files copied successfully!${NC}"
else
    echo -e "${RED}Error: Failed to copy project files${NC}"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Step 4: Show what will be included
echo -e "${YELLOW}Files and directories to be archived:${NC}"
find "$TEMP_DIR" -maxdepth 2 -type f -o -type d | head -20 | sed 's|^'"$TEMP_DIR"'/||' | sort
TOTAL_FILES=$(find "$TEMP_DIR" -type f | wc -l)
if [ $TOTAL_FILES -gt 20 ]; then
    echo "... and $((TOTAL_FILES - 20)) more files"
fi
echo -e "${GREEN}Total files: $TOTAL_FILES${NC}"

# Step 5: Create tar.gz archive
echo -e "${YELLOW}Creating archive: $ARCHIVE_NAME${NC}"
if tar -czf "$ARCHIVE_NAME" -C "$TEMP_DIR" .; then
    echo -e "${GREEN}Archive created successfully: $ARCHIVE_NAME${NC}"
else
    echo -e "${RED}Failed to create archive!${NC}"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Step 6: Clean up temporary directory
echo -e "${YELLOW}Cleaning up temporary files...${NC}"
rm -rf "$TEMP_DIR"

# Step 7: Show archive info
ARCHIVE_SIZE=$(du -h "$ARCHIVE_NAME" | cut -f1)
echo -e "${GREEN}✅ Submission archive created successfully!${NC}"
echo -e "${GREEN}Archive: $ARCHIVE_NAME${NC}"
echo -e "${GREEN}Size: $ARCHIVE_SIZE${NC}"

# Step 8: Show excluded directories summary
echo -e "${YELLOW}Excluded directories:${NC}"
for exclude in "${EXCLUDE_DIRS[@]}"; do
    if [ -e "$exclude" ]; then
        echo -e "${RED}  ✗ $exclude${NC}"
    fi
done

# Optional: List contents of the archive (first 30 files)
echo -e "${YELLOW}Archive contents (preview):${NC}"
tar -tzf "$ARCHIVE_NAME" | head -30
if [ $(tar -tzf "$ARCHIVE_NAME" | wc -l) -gt 30 ]; then
    echo "... and $(($(tar -tzf "$ARCHIVE_NAME" | wc -l) - 30)) more files"
fi

echo -e "${GREEN}Ready for submission!${NC}"