"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchModel = searchModel;
exports.compareSearchModel = compareSearchModel;
// Search if a value exists in a model
function searchModel(model, searchValues) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const searchValue of searchValues) {
            const search = yield model.findOne({ where: searchValue });
            if (search) {
                // User exists
                return false;
            }
        }
        // User dont exists
        return true;
    });
}
// Search if a value exists and its different 
function compareSearchModel(model, searchValues, id) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const searchValue of searchValues) {
            const search = yield model.findOne({ where: searchValue });
            if (search && search.id != id) {
                // User exists
                return false;
            }
        }
        // User dont exists
        return true;
    });
}
