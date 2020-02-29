### 1. [two sum](https://leetcode-cn.com/problems/two-sum/)
```py
def twoSum(self, nums: List[int], target: int) -> List[int]:
    mappings = dict()
    for i, num in enumerate(nums):
        diff = target - num
        if diff in mappings:
            return [mappings[diff], i]

        mappings[num] = i
```
