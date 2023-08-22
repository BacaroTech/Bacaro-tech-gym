class Solution(object):

    def maxProfit_bruteforce(self, prices):

        """

        :type prices: List[int]

        :rtype: int

        """

        best_profit = 0

        for idx_buy in range(len(prices)):

            idx_sell = idx_buy + 1

            while idx_sell < len(prices):

                best_profit = max(best_profit, prices[idx_sell] - prices[idx_buy])

                idx_sell += 1

        return best_profit

 

    def maxProfit(self, prices):
        min_array = [0]*len(prices)
        max_array = [0]*len(prices)
        curr_min= prices[0]

        for idx_buy in range(len(prices)):
            curr_min = min(curr_min, prices[idx_buy])
            min_array[idx_buy] = curr_min

        curr_max= prices[-1]
        for idx_sell in range(len(prices))[::-1]:
            curr_max = max(curr_max, prices[idx_sell])
            max_array[idx_sell] = curr_max

        best_profit = 0
        for idx in range(len(prices)):
            best_profit = max(best_profit, max_array[idx]-min_array[idx])

        return best_profit