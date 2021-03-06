/* global ko, BaseViewModel */

function StatusViewModel(baseEndpoint) {
  "use strict";
  var self = this;
  var endpoint = ko.pureComputed(function () { return baseEndpoint() + "/status"; });

  BaseViewModel.call(self, {
    "mode": "ERR",
    "wifi_client_connected": 0,
    "eth_connected": 0,
    "net_connected": 0,
    "srssi": "",
    "ipaddress": "",
    "packets_sent": 0,
    "packets_success": 0,
    "emoncms_connected": 0,
    "emoncms_message": false,
    "mqtt_connected": 0,
    "ocpp_connected": 0,
    "ohm_hour": "",
    "free_heap": 0,
    "comm_sent": 0,
    "comm_success": 0,
    "rapi_connected": 1,
    "evse_connected": 1,
    "amp": 0,
    "voltage": false,
    "pilot": 0,
    "temp": false,
    "temp1": false,
    "temp2": false,
    "temp3": false,
    "temp4": false,
    "state": 0,
    "vehicle": false,
    "colour": false,
    "manual_override": false,
    "elapsed": 0,
    "wattsec": 0,
    "watthour": 0,
    "gfcicount": 0,
    "nogndcount": 0,
    "stuckcount": 0,
    "divertmode": 1,
    "solar": 0,
    "grid_ie": 0,
    "charge_rate": 0,
    "available_current": false,
    "smoothed_available_current": false,
    "divert_update": 0,
    "divert_active": false,
    "ota_update": false,
    "time": false,
    "offset": false,
    "tesla_vehicle_count": false,
    "tesla_vehicle_id": false,
    "tesla_vehicle_name": false,
    "battery_range": false,
    "battery_level": false,
    "time_to_full_charge": false,
    "tesla_error": false,
    "vehicle_state_update": 0
  }, endpoint);

  // Some devired values
  self.isWiFiError = ko.pureComputed(function () {
    return ("ERR" === self.mode());
  });
  self.isWifiClient = ko.pureComputed(function () {
    return ("STA" === self.mode()) || ("STA+AP" === self.mode());
  });
  self.isWifiAccessPoint = ko.pureComputed(function () {
    return ("AP" === self.mode()) || ("STA+AP" === self.mode());
  });
  self.isWired = ko.pureComputed(() => {
    return ("Wired" === self.mode());
  });
  self.fullMode = ko.pureComputed(function () {
    switch (self.mode()) {
      case "AP":
        return "Access Point (AP)";
      case "STA":
        return "Client (STA)";
      case "STA+AP":
        return "Client + Access Point (STA+AP)";
      case "Wired":
        return "Wired Ethernet";
    }

    return "Unknown (" + self.mode() + ")";
  });


  this.estate = ko.pureComputed(function () {
    var estate;
    switch (self.state()) {
      case 0:
        estate = "Starting";
        break;
      case 1:
        estate = "EV Not connected";
        break;
      case 2:
        estate = "EV Connected";
        break;
      case 3:
        estate = "Charging";
        break;
      case 4:
        estate = "Vent Required";
        break;
      case 5:
        estate = "Diode Check Failed";
        break;
      case 6:
        estate = "GFCI Fault";
        break;
      case 7:
        estate = "No Earth Ground";
        break;
      case 8:
        estate = "Stuck Relay";
        break;
      case 9:
        estate = "GFCI Self Test Failed";
        break;
      case 10:
        estate = "Over Temperature";
        break;
      case 11:
        estate = "Over Current";
        break;
      case 254:
      case 255:
        estate = "Waiting";
        if(false !== self.vehicle())
        {
          estate += " - EV " ;
          if(1 === self.vehicle()) {
            estate += "Connected";
          } else {
            estate += "Not connected";
          }
        }
        break;
      default:
        estate = "Invalid";
        break;
    }
    return estate;
  });
}
StatusViewModel.prototype = Object.create(BaseViewModel.prototype);
StatusViewModel.prototype.constructor = StatusViewModel;
