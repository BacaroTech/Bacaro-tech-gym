class Solution(object):

    def checkDistances(self, s, distance):
        counters = [-1]*26

        for idx in range(len(s))[::-1]:
            letter_position = ord(s[idx])-ord('a')
            current_count = counters[letter_position]
            if current_count == -1:
                counters[letter_position] = idx
            else:
                counters[letter_position] -= (idx + 1)

        for idx in range(len(counters)):
            if counters[idx] != -1 and counters[idx] != distance[idx]:
                return False

        return True