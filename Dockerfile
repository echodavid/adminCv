

# Usar una imagen oficial de httpd (Apache)
FROM httpd:alpine

COPY ./dist/admin-cv/browser/ /usr/local/apache2/htdocs/

EXPOSE 8080
