from django.db import models
from ckeditor.fields import RichTextField
import fitz  # PyMuPDF
import subprocess

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=255)
    summary = models.TextField()
    # author
    keywords = models.CharField(max_length=255)
    content = RichTextField()
    pdf = models.CharField(max_length=255)
    date = models.DateTimeField()

    def __str__(self):
        return self.title
    
    def get_keywords_list(self):
        if self.keywords:
            return [keyword.strip() for keyword in self.keywords.split(',')]
        return []

    def set_keywords_list(self, keywords_list):
        self.keywords = ', '.join(keywords_list)

    def convert_pdf_to_html(self):
        if self.pdf:
            pdf_path = self.pdf.path
            html_path = pdf_path.replace('.pdf', '.html')

            # Extract text from PDF using PyMuPDF
            doc = fitz.open(pdf_path)
            text = ""
            for page_num in range(doc.page_count):
                page = doc[page_num]
                text += page.get_text()
            doc.close()

            # Save text to a temporary HTML file
            with open(html_path, 'w', encoding='utf-8') as html_file:
                html_file.write(text)

            # Use pdf2htmlEX to convert HTML to formatted HTML
            subprocess.run(['pdf2htmlEX', html_path])

            # Read the formatted HTML and store it in the RichTextField
            with open(html_path.replace('.html', '-html.html'), 'r', encoding='utf-8') as formatted_html_file:
                formatted_html = formatted_html_file.read()

            self.content = formatted_html
            self.save()


