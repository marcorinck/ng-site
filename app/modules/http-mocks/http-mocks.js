define(["angular", "ngMocks"], function (angular) {
	"use strict";

	var httpMocks = angular.module("http-mocks", ["ngMockE2E"]), schadensfaelle, historie, $httpBackend, $log;

	schadensfaelle = [
		{ "rechnungsnummer": 1, "rechnungsdatum": 5112837478838, "rechnungsstatus": "V", "schadensdatum": 2838483838989, kontonummerHandwerker: "283883377373", blzHandwerker: "82051000", "zahlBetrag": 1226.7, zahlDatum: 2838483338989, "rechnungId": 846, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/846', erlaubteAktionen: ['bezahlen'], schadensbeschreibung: 'Schaden im Bad', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373' , rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 2, "rechnungsdatum": 5112837478838, "rechnungsstatus": "V", "schadensdatum": 2838483838989, kontonummerHandwerker: "283883377373", blzHandwerker: "82051000", "zahlBetrag": 1409.3999999999999, zahlDatum: 2838483338989, "rechnungId": 972, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/972', erlaubteAktionen: ['bezahlen'], schadensbeschreibung: 'Schaden im Bad', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 3, "rechnungsdatum": 5112837478838, "rechnungsstatus": "V", "schadensdatum": 2838483838989, ibanHandwerker: "DE283883377373", bicHandwerker: "8205100039999999", "zahlBetrag": 613.35, zahlDatum: null, "rechnungId": 423, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/423', erlaubteAktionen: ['bezahlen'], schadensbeschreibung: 'Schaden im Bad', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 4, "rechnungsdatum": 5112837478838, "rechnungsstatus": "V", "schadensdatum": 2838483838989, ibanHandwerker: "DE283883377373", bicHandwerker: "8205100099999999", "zahlBetrag": 711.9499999999999, zahlDatum: 2838483338989, "rechnungId": 491, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/491', schadensbeschreibung: 'Schaden im Bad', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 5, "rechnungsdatum": 5112837478838, "rechnungsstatus": "V", "schadensdatum": 2838483838989, kontonummerHandwerker: "283883377373", blzHandwerker: "82051000", "zahlBetrag": 414.7, zahlDatum: 2838483338989, "rechnungId": 286, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/286', erlaubteAktionen: ['export'], schadensbeschreibung: 'Schaden im Bad', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 6, "rechnungsdatum": 5112837478838, "rechnungsstatus": "V", "schadensdatum": 2838483838989, kontonummerHandwerker: "283883377373", blzHandwerker: "82051000", "zahlBetrag": 569.85, zahlDatum: null, "rechnungId": 393, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/393', erlaubteAktionen: ['export'], schadensbeschreibung: 'Schaden im Bad', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 7, "rechnungsdatum": 5112837478838, "rechnungsstatus": "V", "schadensdatum": 2838483838989, kontonummerHandwerker: "283883377373", blzHandwerker: "82051000", "zahlBetrag": 191.4, zahlDatum: null, "rechnungId": 132, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/132', erlaubteAktionen: ['export'], schadensbeschreibung: 'Schaden im Bad', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 8, "rechnungsdatum": 5112837478838, "rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 20.3, zahlDatum: 2838483338989, "rechnungId": 14, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/14', erlaubteAktionen: ['export'], schadensbeschreibung: 'Schaden im Bad', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 9, "rechnungsdatum": 5112837478838, "rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 249.4, zahlDatum: 2838483338989, "rechnungId": 172, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/172', schadensbeschreibung: 'Schaden im Bad', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 10, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 1302.1, zahlDatum: 2838483338989, "rechnungId": 898, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/898', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 11, "rechnungsdatum": 5112837478838,"rechnungsstatus": "W", "schadensdatum": 2838483838989, "zahlBetrag": 569.85, zahlDatum: 2838483338989, "rechnungId": 393, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/393', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 12, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 247.95, zahlDatum: 2838483338989, "rechnungId": 171, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/171', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 13, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 593.05, zahlDatum: 2838483338989, "rechnungId": 409, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/409', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 14, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 1113.6, zahlDatum: 2838483338989, "rechnungId": 768, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/768', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 15, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 1103.45, zahlDatum: 2838483338989, "rechnungId": 761, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/761', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 16, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 1013.55, zahlDatum: 2838483338989, "rechnungId": 699, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/699', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1133311/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 17, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 139.2, zahlDatum: 2838483338989, "rechnungId": 96, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/96', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 18, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 555.35, zahlDatum: 2838483338989, "rechnungId": 383, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/383', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 19, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 134.85, zahlDatum: 2838483338989, "rechnungId": 93, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/93', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 20, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 224.75, zahlDatum: 2838483338989, "rechnungId": 155, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/155', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 21, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 725, zahlDatum: 2838483338989, "rechnungId": 500, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/500', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/11111111/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 22, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 314.65, zahlDatum: 2838483338989, "rechnungId": 217, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/217', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 23, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 706.15, zahlDatum: 2838483338989, "rechnungId": 487, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/487', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]},
		{ "rechnungsnummer": 24, "rechnungsdatum": 5112837478838,"rechnungsstatus": "V", "schadensdatum": 2838483838989, "zahlBetrag": 730.8, zahlDatum: 2838483338989, "rechnungId": 504, detailUrl: '/remote/external/rest/versicherungsanbindung-saga/schadensfaelle/504', schadensbeschreibung: 'FEUER (NG- und G-Sach ohne Industrie und FBU)', typ: 'Verbundene Gebäudeversicherung ABW2', versicherungsschein: '0815/1144411/22', kontierung: "1/2/3", mieterName: "Robert Bosch", mieterAdresse: "Dienstweg 1, 55130 Mainz", mieterKontakt: "01234567890", sachbearbeiterName: "Sebastian Springer", sachbearbeiterEmail: "mail@example.com", bezugsauftrag: "123458584743", mieterHausratversicherungName: "Feuerkasse", mieterHausratversicherungNummer: "838474834384", aktenzeichenPolizeiProtokoll: "AZ/138484/ABC", auftragsnummer: '84747347373', rechnungspositionen: [{position: "1", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}, {position: "2", text: "Positionstext", menge: 22, einzelpreis: 34.3, gesamtpreis: 100}],  auftragspositionen: [{position: "1", bauteil: "Das Bauteil", inventarposition: "Das Inventar", schadensbeschreibung: "Schaden 23", leistungsbeschreibung: "Leistung hier!"}, {position: "2", bauteil: "Das Bauteil 42", inventarposition: "Das Inventar noch was", schadensbeschreibung: "Schaden 333", leistungsbeschreibung: "Leistung hier!"}]}
	];

	historie = [
		{"statusdatum": 1119363939399, "status": "U"},
		{"statusdatum": 1119373939399, "status": "Q"},
		{"statusdatum": 1119383939399, "status": "V"},
		{"statusdatum": 1119393939399, "status": "W"}
	];

//	function mock(url, data, method) {
//		var _method = method || "GET";
//
//		$httpBackend.when(_method, url).respond(data);
//	}

	function getPage(array, page, searchText) {
		return array.filter(function (schadensfall, index) {
			var key, found;
			if (searchText) {
				for (key in schadensfall) {
					if (schadensfall.hasOwnProperty(key)) {
						if (schadensfall[key] && schadensfall[key].toString().toLowerCase().indexOf(searchText.toString().toLowerCase()) !== -1) {
							found = true;
							break;
						}
					}
				}

				return found;
			}
			if (page === 1) {
				return index < 10;
			} else if (page === 2) {
				return index >= 10 && index < 20;
			} else if (page === 3) {
				return index >= 20;
			}

			return false;
		});
	}

	function mockListe() {
		var schadensfaelleData = {
			"success": true,
			"messages": [],
			"itemsPerPage": 10,
			"maxPages": 66,
			"maxItems": 660
		};

		$httpBackend.whenGET(/.*\/schadensfaelle/).respond(
			function (method, url, data, headers) {
				//TODO - headers.itemsPerPage und Filter auswerten
				var currentPage = headers.currentPage || 1, searchText = null, searchIndex;

				$log.info("Mocke Request für URL: ", url);

				searchIndex = url.lastIndexOf('search=');

				if (searchIndex !== -1) {
					searchText = url.substr(searchIndex + 7, url.length - 1);
				}

				schadensfaelleData.result = getPage(schadensfaelle, currentPage, searchText);

				if (searchText) {
					schadensfaelleData.maxItems = 660;
					schadensfaelleData.currentPage = 1;
				} else {
					schadensfaelleData.maxItems = 660;
					schadensfaelleData.currentPage = currentPage;
				}

				return [200, schadensfaelleData, {}]; //response status, data, headers
			}
		);

		$httpBackend.whenGET(/.*\/versicherungsscheine/).respond(function () {
			var versicherungsscheine = [], data = {
				"success": true,
				"messages": []
			};
			schadensfaelle.forEach(function(schadensfall) {
				if (schadensfall.versicherungsschein && versicherungsscheine.indexOf(schadensfall.versicherungsschein) === -1) {
					versicherungsscheine.push(schadensfall.versicherungsschein);
				}
			});

			data.result = versicherungsscheine;

			return [200, data, {}];
		});
	}

	function mockStatushistorie() {
		$httpBackend.whenGET(/.*\/historie/).respond(
			function () {
				var statushistorie = {};
				statushistorie.success = true;
				statushistorie.result = historie;
				return [200, statushistorie, {}]; //response status, data, headers
			}
		);
	}

	function mockSammelBezahltMeldung() {
		$httpBackend.whenGET(/.*\/sammelBezahltMeldung/).respond(
			function () {
				return [200, {success: true, result: [1,2,3,4,5,6,7]}, {}]; //response status, data, headers
			}
		);

		$httpBackend.whenPOST(/.*\/sammelBezahltMeldung/).respond(
			function () {
				return [200, {success: true, result: []}, {}]; //response status, data, headers
			}
		);
	}

	function mockDetailansicht() {
		$httpBackend.whenGET(/.*\/schadensfaelle\/[0-9]/).respond(
			function (method, url) {
				var responseData = null, index, id;

				index = url.lastIndexOf('/');
				id = url.substr(index+1, url.length-index);

				schadensfaelle.some(function(schadensfall) {
					if (schadensfall.rechnungId === parseInt(id)) {
						responseData = schadensfall;
						return true;
					}

					return false;
				});

				return [200, {success: true, result: responseData}, {}]; //response status, data, headers
			}
		);
	}

	function mockLogin() {
		$httpBackend.whenPOST(/.*\/login/).respond(
			function () {
				return [200, //response status
					{ //data
						success: true,
						result: {
							versicherungsname: 'John Locke',
							kommentar: 'Hanso Foundation',
							benutzername: 'Tester'
						}
					},
					{}]; //headers
			}
		);
	}

	httpMocks.run(['$httpBackend', '$log', function (_$httpBackend, _$log) {
		$httpBackend = _$httpBackend;
		$log = _$log;

		//nicht zu mockende Requests die durchgereicht werden sollen
		$httpBackend.whenGET(/translations.*\//).passThrough();
		$httpBackend.whenGET(/.*\.html/).passThrough();

		//definierte Mocks setzen
		mockStatushistorie();
		mockDetailansicht();
		mockListe();
		mockSammelBezahltMeldung();
		mockLogin();
	}]);

	return httpMocks;

});
