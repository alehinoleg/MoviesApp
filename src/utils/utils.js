
function color(vote_average) {
  let color = '#E90000';
  if (vote_average >= 3 && vote_average <= 5) {color='#E97E00'};
  if (vote_average > 5 && vote_average <= 7) {color='#E9D100'};
  if (vote_average > 7) {color='#66E900'};
  return color;
};

export default color;
