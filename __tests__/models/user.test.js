import "../test-setup";
import { describe, it, expect } from "vitest";

const User = require("../../src/models/User");

describe("User Model", () => {

  it("should create a user", async () => {

    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");

  });

});