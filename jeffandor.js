helperTextOptions = {
  goManual:"Google can't find your address? Click here to enter an address manually.",
  goAutomatic:"Click here to try automatic address selection."
};

Addresses = new Mongo.Collection("addresses");

function showThanks () {
  $('.manualAddressRequest').hide();
  $('.addressRequest').hide();
  $('.havingTrouble').hide();
  $('.thanks').fadeIn();
};

if (Meteor.isClient) {

  Session.setDefault('helperText', helperTextOptions.goAutomatic);

  Template.body.events({
    "click .havingTrouble": function () {
      if(Session.get('helperText') == helperTextOptions.goManual) {
        $('.addressRequest').hide();
        $('.manualAddressRequest').show();
        Session.set('helperText', helperTextOptions.goAutomatic);
      } else {
        $('.addressRequest').show();
        $('.manualAddressRequest').hide();
        Session.set('helperText', helperTextOptions.goManual);
      }
    }
  });

  Template.body.helpers({
    helperText: function() {
      return Session.get('helperText');
    }
  })

  Template.addressEntry.events({
    "submit .entryform": function (event) {
      //console.log(event);
      event.preventDefault();

      var name = event.target.person_name.value.trim();
      var email = event.target.email.value.trim();
      var address = event.target.fulladdr.value.trim();
      var line2 = event.target.line2.value.trim();

      var addressObject = {
        name: name,
        email: email,
        address: address,
        line2: line2
      }

      //console.log(addressObject);
      Meteor.call("addAddressEntry", addressObject);

      event.target.person_name.value = "";
      event.target.email.value = "";
      event.target.fulladdr.value = "";
      event.target.line2.value = "";
      showThanks();
    }
  });

  Template.manualAddressEntry.events({
    "submit .manualentryform": function (event) {
      //console.log(event);
      event.preventDefault();

      var name = event.target.manual_person_name.value.trim();
      var email = event.target.manual_email.value.trim();
      var line1 = event.target.manual_line1.value.trim();
      var line2 = event.target.manual_line2.value.trim();
      var city = event.target.manual_city.value.trim();
      var state = event.target.manual_state.value.trim();
      var zip = event.target.manual_zip.value.trim();
      var country = event.target.manual_country.value.trim();

      var fulladdress = line1 + ', ' + city + ", " + state + " " + zip + ", " + country;

      var addressObject = {
        name: name,
        email: email,
        address: fulladdress,
        line2: line2
      }

      //console.log(addressObject);

      Meteor.call("addAddressEntry", addressObject);

      event.target.manual_person_name.value = "";
      event.target.manual_email.value = "";
      event.target.manual_line1.value = "";
      event.target.manual_line2.value = "";
      event.target.manual_city.value = "";
      event.target.manual_state.value = "";
      event.target.manual_zip.value = "";
      event.target.manual_country.value = "";
      showThanks();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  addAddressEntry: function (addressObject) {
    Addresses.insert({
      name: addressObject["name"],
      email: addressObject["email"],
      address: addressObject["address"],
      line2: addressObject["line2"],
      cratedAt: new Date()
    });
  }
})