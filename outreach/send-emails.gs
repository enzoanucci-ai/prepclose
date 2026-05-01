// Prepclose cold outreach — Google Apps Script
// Sheet columns: A = First Name, B = Email, C = Sent, D = Follow-up Sent
// Triggers: sendFollowUps at 8am, sendColdEmails at 10am

function sendColdEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var count = 0;

  for (var i = 1; i < data.length; i++) {
    if (count >= 25) break;

    var firstName = data[i][0];
    var email = data[i][1];
    var sent = data[i][2];

    if (sent === true) continue;

    var subject = "your reps are losing 30 min per call to research";
    var body = "Hey " + firstName + ",\n\n" +
      "Does your sales team research before calls? Company background, recent news, that kind of thing?\n\n" +
      "Most reps spend around 30 minutes on it per call. Five reps doing four calls a day and you're losing 10 hours of actual selling time every day just to prep.\n\n" +
      "I built a tool called Prepclose that automates it. Hook it up to your lead list and each rep gets a brief in Slack or email before the call. No digging around, they just show up ready.\n\n" +
      "Got 15 minutes to see if it makes sense for your team?\n\n" +
      "Enzo Nucci\n" +
      "prepclose.com\n" +
      "Book a call";

    GmailApp.sendEmail(email, subject, body, {
      name: "Enzo Nucci",
      replyTo: "enzo@prepclose.com"
    });

    sheet.getRange(i + 1, 3).setValue(true);
    count++;
    Utilities.sleep(2000);
  }
}

function sendFollowUps() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var firstName = data[i][0];
    var email = data[i][1];
    var sent = data[i][2];
    var followedUp = data[i][3];

    if (sent !== true) continue;
    if (followedUp === true) continue;

    var subject = "re: your reps are losing 30 min per call to research";
    var body = "Hey " + firstName + ",\n\n" +
      "Just following up on this. How many calls is your team running per week? Happy to run the numbers for your team specifically.\n\n" +
      "Enzo Nucci\n" +
      "prepclose.com\n" +
      "Book a call";

    GmailApp.sendEmail(email, subject, body, {
      name: "Enzo Nucci",
      replyTo: "enzo@prepclose.com"
    });

    sheet.getRange(i + 1, 4).setValue(true);
    Utilities.sleep(2000);
  }
}
