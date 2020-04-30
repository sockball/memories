### 1. [two sum](https://leetcode-cn.com/problems/two-sum/)
```py
def twoSum(self, nums: List[int], target: int) -> List[int]:
  for i, v  in enumerate(nums):
      for j, k  in enumerate(nums[(i+1):]):
          if v + k == target:
              return [i, j + i + 1]
```

### 2. [add-two-numbers](https://leetcode-cn.com/problems/add-two-numbers/)
```py
# carry 进位

def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
    def getResult (l1, l2, carry = 0):
        if l1 is None and l2 is None and carry == 0:
            return None
        l1, num1 = (None, 0) if l1 is None else (l1.next, l1.val)
        l2, num2 = (None, 0) if l2 is None else (l2.next, l2.val)
        sum = num1 + num2 + carry
        num, carry = (sum % 10, sum // 10)
        res = ListNode(num)
        res.next = getResult(l1, l2, carry)
        return res

    return getResult(l1, l2)

# 拓展 链表数字正序排列
def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
    def getResult (l1, l2):
        if l1 is None and l2 is None:
            return (None, 0)
        l1, num1 = (None, 0) if l1 is None else (l1.next, l1.val)
        l2, num2 = (None, 0) if l2 is None else (l2.next, l2.val)
        next, carry = getResult(l1, l2)
        sum = num1 + num2 + carry
        num, carry = (sum % 10, sum // 10)
        res = ListNode(num)
        res.next = next
        return (res, carry)

    return getResult(l1, l2)[0]
```

### 3. [longest substring without repeating characters](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)
```py
def lengthOfLongestSubstring(self, s: str) -> int:
    res = current = ''
    for letter in s:
        index = current.find(letter)
        if index >= 0:
            res = current if len(res) < len(current) else res
            current = current[index+1:] + letter
        else:
            current += letter
    else:
        # 如'a'、'aab'的情况需要多计算一次
        res = current if len(res) < len(current) else res
    return len(res)
```

### 5. [longest palindromic substring](https://leetcode-cn.com/problems/longest-palindromic-substring)
```py
# 暴力法...(可能超时...)
def longestPalindrome(self, s: str) -> str:
    res = current = ''
    for i in range(len(s)):
        current = s[i]
        for second in s[i+1:]:
            current += second
            if current[::-1] == current:
                res = current if len(res) < len(current) else res
    return res if res else current
```

### 7. [reverse integer](https://leetcode-cn.com/problems/reverse-integer)
```
# 通过字符串反转...
def reverse(self, x: int) -> int:
    if x is 0: return 0
    sign = 1 if x > 0 else -1
    x = str(x)[::-1]
    x = int(x if sign is 1 else x[:-1])
    out = (x < -2 ** 31 or x > (2 ** 31 - 1))

    return 0 if out else x * sign
```