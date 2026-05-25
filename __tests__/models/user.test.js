import("../test-setup");
import { describe, it, expect } from "vitest";
import User from "../../src/models/User";

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
      profileImage: "http://image.com",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
    expect(user.profileImage).toBe("http://image.com");
  });

  it("should not allow duplicate email", async () => {
    await User.create({
      username: "user1",
      email: "duplicate@test.com",
      profileImage: "http://image.com",
    });

    await expect(
      User.create({
        username: "user2",
        email: "duplicate@test.com",
        profileImage: "http://image.com",
      }),
    ).rejects.toThrow(/duplicate key/);
  });

  it("should not allow duplicate username", async () => {
    await User.create({
      username: "sameuser",
      email: "a@test.com",
      profileImage: "http://image.com",
    });

    await expect(
      User.create({
        username: "sameuser",
        email: "b@test.com",
        profileImage: "http://image.com",
      }),
    ).rejects.toThrow(/duplicate key/);
  });

  it("should validate email format", async () => {
    await expect(
      User.create({
        username: "bademail",
        email: "not-an-email",
        profileImage: "http://image.com",
      }),
    ).rejects.toThrow(/Invalid email/);
  });

  it("should validate profileImage URL", async () => {
    await expect(
      User.create({
        username: "user3",
        email: "user3@test.com",
        profileImage: "not-a-url",
      }),
    ).rejects.toThrow(/valid URL/);
  });
});
