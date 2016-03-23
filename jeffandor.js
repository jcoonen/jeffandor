RSVPs = new Mongo.Collection("rsvps");

if (Meteor.isClient) {
  
  Template.rsvpEntry.events({
    "submit .rsvp-form": function (event) {
      event.preventDefault();

       var  rsvpFormFieldNames = ['name', 'email', 'guest_list', 'attending_wedding', 'message'],
            rsvpObject = {},
            emailre = /\S+@\S+\.\S+/,
            error = false,
            attending = false;

      rsvpFormFieldNames.forEach(function (fieldName) {
        var $fields = $('.'+fieldName);

        $fields.each(function() {
          var $field = $(this),
              val = $field.val().trim(),
              add = false;

          if ($field.hasClass('required') && val === "") {
            $field.addClass('invalid');
            error = true;
          } else if (fieldName === "email" && val !== "" && emailre.test(val) === false) {
              $field.addClass('invalid');
              error = true;
          } else {
            if ($field.is('button')) {
              if ($field.hasClass('active')) {
                val = $field.data().value;
                add = true;
                attending = true;
              }
            } else {
              add = true;
            }
          }

          if (add) {
            if (rsvpObject[fieldName] !== undefined) {
              rsvpObject[fieldName] += ',' + val;
            } else {
              rsvpObject[fieldName] = val;
            }
          }
        });
      });

      if (error) {
        Meteor.call('showError', 'Missing name or email');
        return false;
      }

      Meteor.call('addRsvpEntry', rsvpObject);
      if(attending) {
        Meteor.call('showSuccess', 'See you there!!!');
      } else {
        Meteor.call('showSuccess', 'Sorry you can\'t make it :(');
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  addRsvpEntry: function (rsvpObject) {
    RSVPs.insert(rsvpObject);
  },
  showError: function (contact_form_error_msg) {
    var $submit_btn = $('.submit_form');
    $submit_btn.width($submit_btn.width());

    $('i', $submit_btn).each(function () {
        var $icon = $(this),
            iClass = $icon.attr("class");

        $icon.removeClass(iClass).addClass('fa fa-times').delay(1500).queue(function (next) {
            $(this).removeClass('fa fa-times').addClass(iClass);
            next();
        });
    });

    $submit_btn.addClass('btn-danger').delay(1500).queue(function (next) {
        $(this).removeClass('btn-danger');
        next();
    });

    $(".form_status_message").html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + contact_form_error_msg + '</div>');
  },
  showSuccess: function (contact_form_success_msg) {
    var $submit_btn = $('.submit_form');

    $submit_btn.width($submit_btn.width());

    $('i', $submit_btn).each(function () {
        var $icon = $(this),
            iClass = $icon.attr("class");

        $icon.removeClass(iClass).addClass('fa fa-check').delay(1500).queue(function (next) {
            $(this).removeClass('fa fa-check').addClass(iClass);
            next();
        });
    });

    $submit_btn.addClass('btn-success').delay(1500).queue(function (next) {
        $(this).removeClass('btn-success');
        next();
    });

    $(".form_status_message").html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + contact_form_success_msg + '</div>');
  }
})