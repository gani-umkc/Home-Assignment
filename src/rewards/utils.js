export const getTotalRewards = (txns) => {
    let rewards = 0
    txns.forEach(t => {
      if(t.amount>100) {
        rewards += ((Math.floor(t.amount) - 100) * 2 ) + 50
      } 
      else if(t.amount>50) {
        rewards += ((Math.floor(t.amount) - 50) * 1 ) 
      }
    })
    return rewards
}

