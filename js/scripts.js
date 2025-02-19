// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};
AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};
AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};
AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};
function Contact(firstName, lastName, phoneNumber, emailAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.allAddress = {};
}
function Address(personal, work) {
this.personal = personal;
this.work = work;
}
Contact.prototype.addAddress = function(address) {
  address.id = this.assignId();
  this.allAddress[address.id] = address;
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();
function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}
function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}
function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".work-address").html(contact.allAddress.work);
  $(".personal-address").html(contact.allAddress.personal);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}
function emptyForm() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
  $("input#new-email-address").val("");
  $("input#new-physical-address").val("");
  $("input#new-work-address").val("");
};
$(document).ready(function() {
  attachContactListeners(); 
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail = $("input#new-email-address").val();
    const inputtedPersonalAddress = $("input#new-personal-address").val();
    const inputtedWorkAddress = $("input#new-work-address").val();
    emptyForm();
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail);
    let newAddress = new Address(inputtedPersonalAddress, inputtedWorkAddress);
    console.log(newContact);
    newContact.addAddress(newAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});