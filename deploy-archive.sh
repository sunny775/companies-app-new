#!/bin/bash

# Exit on any error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BUILD_DIR=".next"
TEMP_DIR="build_temp"
ARCHIVE_NAME="app.tar.gz"

# Files and directories to include in archive
ITEMS_TO_COPY=(
    ".next"
    "public"
    "package.json"
    "package-lock.json"
    "next.config.ts"
)

echo -e "${YELLOW}Starting Next.js build and archive process...${NC}"

# Step 1: Run npm run build
echo -e "${YELLOW}Running npm run build...${NC}"
if npm run build; then
    echo -e "${GREEN}Build completed successfully!${NC}"
else
    echo -e "${RED}Build failed! Exiting.${NC}"
    exit 1
fi

# Step 2: Check if required items exist
echo -e "${YELLOW}Checking required files and directories...${NC}"
missing_items=()
for item in "${ITEMS_TO_COPY[@]}"; do
    if [ ! -e "$item" ]; then
        missing_items+=("$item")
    fi
done

if [ ${#missing_items[@]} -gt 0 ]; then
    echo -e "${RED}Warning: The following items were not found:${NC}"
    for item in "${missing_items[@]}"; do
        echo -e "${RED}  - $item${NC}"
    done
    echo -e "${YELLOW}Continuing with available items...${NC}"
fi

# Step 3: Create temporary directory and copy items
echo -e "${YELLOW}Copying files and directories...${NC}"
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

for item in "${ITEMS_TO_COPY[@]}"; do
    if [ -e "$item" ]; then
        echo -e "  Copying $item..."
        cp -r "$item" "$TEMP_DIR"/ || {
            echo -e "${RED}Error: Failed to copy $item${NC}"
            rm -rf "$TEMP_DIR"
            exit 1
        }
    fi
done

echo -e "${GREEN}All available items copied successfully!${NC}"

# Step 4: Create tar.gz archive
echo -e "${YELLOW}Creating archive: $ARCHIVE_NAME${NC}"
if tar -czf "$ARCHIVE_NAME" -C "$TEMP_DIR" .; then
    echo -e "${GREEN}Archive created successfully: $ARCHIVE_NAME${NC}"
else
    echo -e "${RED}Failed to create archive!${NC}"
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Step 5: Clean up temporary directory
echo -e "${YELLOW}Cleaning up temporary files...${NC}"
rm -rf "$TEMP_DIR"

# Step 6: Show archive info
ARCHIVE_SIZE=$(du -h "$ARCHIVE_NAME" | cut -f1)
echo -e "${GREEN}✅ Process completed successfully!${NC}"
echo -e "${GREEN}Archive: $ARCHIVE_NAME${NC}"
echo -e "${GREEN}Size: $ARCHIVE_SIZE${NC}"
