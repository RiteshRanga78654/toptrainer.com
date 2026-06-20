

strs = ["act","pots","tops","cat","stop","hat"]
hashmap = {} #{"sortedName" : "realNames"}
for i in strs:
    print(i)
    sortedStr = "".join(sorted(i))

    hashmap[sortedStr] = i

print(sortedStr)
