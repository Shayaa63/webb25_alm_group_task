import { describe, it, expect } from "vitest";
import User from "../../src/models/User.js";
import Accommodation from "../../src/models/Accommodation.js";
import "../test-setup.js";

describe("Cascade delete: User → Accommodation", () => {
  it("should delete accommodations when user is deleted", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
      profileImage: "http://image.com",
    });

    await Accommodation.create({
      title: "Test room",
      userId: user._id,
      rooms: 2,
      rent: 5000,
      postalCode: "12345",
      country: "Sweden",
      city: "Stockholm",
      address: "Testgatan 1"
    });

    await User.findOneAndDelete({ _id: user._id });

    const remaining = await Accommodation.find({ userId: user._id });

    expect(remaining.length).toBe(0);
  });
});