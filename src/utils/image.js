export const headerBgUrl = (day) => {
  return day ? `/images/${ day % 7 }.jpg` : `/images/home.jpg`
}

export const headerBgClass = (day) => {
  return `header__bg_${ day % 7 }`
}
