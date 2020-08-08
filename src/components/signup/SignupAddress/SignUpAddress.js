import PostcodeService from "@/services/PostcodeService";
import { getAddressOnOneLine, sortAlphaNumValueObject } from "@/utils.js";
import {
  bedroomsList,
  receptionsList,
  propertyTypesList
} from "@/data/propertyTypeLists.json";

export default {
  name: "signupAddress",
  props: {
    msgObject: Object
  },
  data() {
    return {
      valid: false,
      error: null,
      purchaseDateVisible: false,
      visible: false,
      menu: false,
      postcode: null,
      addresses: null,
      errors: [],
      addressForPostCode: true,
      addressForm: false,
      registration: {
        addressOnOneLine: null,
        address1: null,
        address2: null,
        address3: null,
        address4: null,
        locality: null,
        cityTown: null,
        county: null,
        country: null,
        postcode: null,
        propertyType: null,
        bedrooms: null,
        receptions: null,
        dateMovedIn: null
      },
      bedroomsList,
      receptionsList,
      propertyTypesList,
      postCodeRules: [
        v => !!v || "Postcode is required",
        v =>
          /^\s*[a-zA-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][a-zA-Z]{2}\s*$/g.test(v) ||
          "Please enter a valid UK postcode"
      ]
    };
  },
  mounted() {
    if (this.$route.params.postcode) {
      //this.registration.email = this.$route.params.email;
      this.postcode = this.$route.params.postcode;
      this.populateAdressDropdownFromPostcode(this.postcode);
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },

    postcode: function(val) {
      if (val && val.length > 5) {
        this.populateAdressDropdownFromPostcode(val);
      } else {
        //
      }
    }
  },

  methods: {
    populateAdressDropdownFromPostcode: function(val) {
      this.$ga.event(
        "SignupAddressesForm",
        "Select",
        "PostcodeField",
        this.postcode
      );
      // TODO: consider adding support for expand to get more address details back?
      // format ["Line1,Line2,Line3,Line4,Locality,Town/City,County"]
      PostcodeService.getAddresses(val)
        .then(response => {
          var addressObjectList = [];
          //

          // TODO: if not found or other errors show address boxes so they can add address.
          if (response.data.Message) {
            this.addresses = null;
            this.$refs.addressField.reset();
            this.errors = ["No address found for this postcode"];
            this.addressForPostCode = false;
          } else {
            this.errors = [];
            this.addressForPostCode = true;
            response.data.addresses.forEach(function(value) {
              var addressOneLine = getAddressOnOneLine(value);

              //add an addressObject to the array
              const addressObject = {
                name: addressOneLine,
                value: value
              };
              addressObjectList.push(addressObject);
            });
            // sort with the values of the object
            addressObjectList.sort(sortAlphaNumValueObject);
            this.addresses = addressObjectList;
            this.registration.postcode = val;
          }
        })
        .catch(e => {});
    },
    onAddressChange: function(value) {
      this.$ga.event("SignupAddressesForm", "Select", "AddressField", value);
      //
      //format ["Line1,Line2,Line3,Line4,Locality,Town/City,County"]
      var partsOfAddress = value.split(", ");
      this.registration.address1 = partsOfAddress[0];
      this.registration.address2 = partsOfAddress[1];
      this.registration.address3 = partsOfAddress[2];
      this.registration.address4 = partsOfAddress[3];
      this.registration.locality = partsOfAddress[4];
      this.registration.cityTown = partsOfAddress[5];
      this.registration.county = partsOfAddress[6];

      this.registration.addressOnOneLine = getAddressOnOneLine(value);
      this.syncDataToObj();
      //this.$emit("childUpdated", this.msgObject);
    },
    onPostcodeChange: function(value) {
      // format the postcode an set it
      value = value.replace(/ /g, "");
      value = value.toUpperCase();
      if (value.length > 4) {
        var position = value.length - 3;
        value = [value.slice(0, position), " ", value.slice(position)].join("");
      }
      this.postcode = value;
      this.registration.postcode = value;
      this.syncDataToObj();
    },
    onChange: function(event) {
      this.syncDataToObj();
      //this.$emit("childUpdated", this.msgObject);
    },
    syncDataToObj: function() {
      this.msgObject.addressDetails = this.registration;
      this.$emit("childUpdated", this.msgObject);
    },
    saveDateOnChange(dateEvent) {
      this.$refs.menu.save(dateEvent);
      this.onChange(dateEvent);
    },
    stepAddress() {
      if (this.$refs.addressForm.validate()) {
        this.$emit("stepNext");
        window.scrollTo(0, 0);
      }
    }
  }
};
