// Google Apps Script for Wedding RSVP Form
// Deploy this as a Web App in Google Apps Script

function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Prepare the row data
    var timestamp = new Date();
    var name = data.name || '';
    var email = data.email || '';
    var phone = data.phone || '';
    var attendance = data.attendance || '';
    var events = Array.isArray(data.events) ? data.events.join(', ') : '';
    var guestCount = data.guestCount || '';
    var dietary = data.dietary || '';
    var message = data.message || '';
    
    // Append the data to the sheet
    sheet.appendRow([
      timestamp,
      name,
      email,
      phone,
      attendance,
      events,
      guestCount,
      dietary,
      message
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'RSVP submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function doGet(e) {
  return ContentService
    .createTextOutput('Wedding RSVP Form API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}
