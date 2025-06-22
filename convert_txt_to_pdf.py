#!/usr/bin/env python3
"""
Script to convert all .txt files in the current directory to PDF format.
Uses reportlab library for PDF generation.
"""

import os
import glob
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY
import re

def create_pdf_from_text(txt_file_path, pdf_file_path):
    """
    Convert a text file to PDF format.
    
    Args:
        txt_file_path (str): Path to the input text file
        pdf_file_path (str): Path for the output PDF file
    """
    try:
        # Read the text file
        with open(txt_file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Create PDF document
        doc = SimpleDocTemplate(pdf_file_path, pagesize=letter)
        story = []
        
        # Get styles
        styles = getSampleStyleSheet()
        
        # Create custom styles for better formatting
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=16,
            spaceAfter=20,
            alignment=TA_LEFT
        )
        
        body_style = ParagraphStyle(
            'CustomBody',
            parent=styles['Normal'],
            fontSize=12,
            spaceAfter=12,
            alignment=TA_JUSTIFY,
            leading=16
        )
        
        # Split content into paragraphs
        paragraphs = content.split('\n\n')
        
        # Process each paragraph
        for i, paragraph in enumerate(paragraphs):
            paragraph = paragraph.strip()
            if not paragraph:
                continue
                
            # First paragraph is usually the title
            if i == 0:
                # Clean up the title (remove extra spaces, etc.)
                title = paragraph.strip()
                story.append(Paragraph(title, title_style))
                story.append(Spacer(1, 20))
            else:
                # Clean up the paragraph text
                clean_paragraph = re.sub(r'\s+', ' ', paragraph).strip()
                if clean_paragraph:
                    story.append(Paragraph(clean_paragraph, body_style))
        
        # Build the PDF
        doc.build(story)
        print(f"✓ Successfully converted: {txt_file_path} → {pdf_file_path}")
        
    except Exception as e:
        print(f"✗ Error converting {txt_file_path}: {str(e)}")

def main():
    """
    Main function to convert all .txt files in the current directory to PDF.
    """
    print("Starting conversion of .txt files to PDF...")
    print("=" * 50)
    
    # Get all .txt files in the current directory
    txt_files = glob.glob("*.txt")
    
    if not txt_files:
        print("No .txt files found in the current directory.")
        return
    
    print(f"Found {len(txt_files)} .txt file(s):")
    for txt_file in txt_files:
        print(f"  - {txt_file}")
    print()
    
    # Convert each file
    for txt_file in txt_files:
        # Create PDF filename (replace .txt with .pdf)
        pdf_file = txt_file.replace('.txt', '.pdf')
        
        # Convert the file
        create_pdf_from_text(txt_file, pdf_file)
    
    print()
    print("=" * 50)
    print("Conversion complete!")
    print(f"Converted {len(txt_files)} file(s) to PDF format.")

if __name__ == "__main__":
    main() 