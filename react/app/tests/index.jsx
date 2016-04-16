import { assert } from "chai";
import React from "react";


describe("Tests juste pour voir", function () {
    it("Ça marche", () => {
        assert(true);
    }) 
});

function add(x, y) {
    return x + y;
}

describe("Fonction addition", function() {
    it("Marche pour des nombres positifs", () => {
        assert(add(3, 5) === 8, "3 + 5 devrait faire 8. Résultat : " + add(3, 5));
    });
});
