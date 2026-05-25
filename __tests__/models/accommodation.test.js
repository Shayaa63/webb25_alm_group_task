require("../test-setup");
import { describe, it, expect } from "vitest";


const Accommodation = require("../../src/models/Accommodation");

describe("Accommodation Model", () => {

  it("should create accommodation", async () => {

    const accommodation = await Accommodation.create({

      address: "Test Street",
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",

      rent: 8000,

      rooms: 2,

      userId: "507f191e810c19729de860ea"

    });

    expect(accommodation).toBeDefined();

  });

});