"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlankSpaces = deleteBlankSpaces;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.capitalizeWords = capitalizeWords;
exports.removeAccents = removeAccents;
function deleteBlankSpaces(name) {
    name = name.replace(/\s+/g, " ").trim();
    return name;
}
function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
function capitalizeWords(name) {
    const newName = name.toLowerCase();
    return newName.replace(/(^\w{1})|(\s+\w{1})/g, match => match.toUpperCase());
}
function removeAccents(name) {
    return name.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
}
