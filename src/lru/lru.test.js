const LRU = require("./lru");

test("Basic functionality", () => {

    // Overflow
    let lru = new LRU(4);
    expect(lru.toString()).toBe("[] (0 entries)");

    expect(lru.get("key1")).toBe(null);

    // Fill it up
    lru.set("key1", "val1");
    lru.set("key2", "val2");
    lru.set("key3", "val3");
    lru.set("key4", "val4");

    expect(lru.toString()).toBe("[key1=val1 key2=val2 key3=val3 key4=val4] (4 entries)");

    expect(lru.get("key5")).toBe(null);

    // Get key1, which should move key1 to newest and make key2 the oldest
    expect(lru.get("key1")).toBe("val1");
    expect(lru.toString()).toBe("[key2=val2 key3=val3 key4=val4 key1=val1] (4 entries)");

    // Add key5, which should evict oldest (key2) from the LRU
    lru.set("key5", "val5");
    expect(lru.get("key5")).toBe("val5");
    expect(lru.toString()).toBe("[key3=val3 key4=val4 key1=val1 key5=val5] (4 entries)");
    expect(lru.get("key2")).toBe(null);

});
