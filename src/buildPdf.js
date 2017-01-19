function buildPdf(value) {
    var pdfContent = value;
    var docDefinition = {
      content: [{
        text: 'My name is: ' + pdfContent.firstName  + ' ' + pdfContent.lastName + '.'
      }]
    }
    console.log(pdfContent);
    return docDefinition;
}