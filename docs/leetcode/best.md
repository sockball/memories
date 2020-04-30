### 1. [two sum](https://leetcode-cn.com/problems/two-sum/)
```py
# HashMap
def twoSum(self, nums: List[int], target: int) -> List[int]:
    mappings = dict()
    for i, num in enumerate(nums):
        diff = target - num
        if diff in mappings:
            return [mappings[diff], i]

        mappings[num] = i
```

### 3. [longest substring without repeating characters](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)
```py
# 滑动窗口
def lengthOfLongestSubstring(self, s: str) -> int:
    mappings = dict()
    left = res = 0
    for right in range(len(s)):
        letter = s[right]
        if mappings.get(letter) is not None:
            left = max(left, mappings[letter] + 1)
        mappings[letter] = right
        res = max(res, right - left + 1)
    return res
```

### 5. [longest palindromic substring](https://leetcode-cn.com/problems/longest-palindromic-substring)
```
```

### 7. [reverse integer](https://leetcode-cn.com/problems/reverse-integer)
```
def reverse(self, x: int) -> int:
    # 注意被除数为负数 除数为正数的 取整/取模 运算 商是向负无穷靠近的...
    max = 2 ** 31 - 1
    min = 2 ** 31 * -1
    max_pop = max % 10
    min_pop = min % -10

    res = 0
    while x is not 0:
        if res > (max / 10) or (res == max / 10 and pop > max_pop):
            return 0
        if res < (min / 10) or (res == min / 10 and pop < min_pop):
            return 0
        pop = x % (10 if x > 0 else -10)
        x = (x // 10 if x > 0 else x // -10 * -1)
        res = res * 10 + pop
    return res
```
