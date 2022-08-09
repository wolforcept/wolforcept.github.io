S = 19
W = 45
H = 20
CARDS_S = 105
CARDS_N = 4
NOISE = 1 - .05
BUTTON_W = 105
BUTTON_H = 40

var buttons
message = "stopped"
currentTurn = 0
board = []
cards = []
chosen = []
canvas = 0
ctx = 0
speeds = [1000, 500, 100, 50, 10]
speedsnames = ["very slow", "slow", "medium", "fast", "very fast"]
speedindex = 0

pos = { "x": 0, "y": 0 }
end = { "x": 0, "y": 0 }
dir = "east"
started = false

img1 = new Image
img1.src = "north.png"
img1.onload = function () {
	img2 = new Image
	img2.src = "south.png"
	img2.onload = function () {
		img3 = new Image
		img3.src = "west.png"
		img3.onload = function () {
			img4 = new Image
			img4.src = "east.png"
			img4.onload = function () {
				img5 = new Image
				img5.src = "forward.png"
				img5.onload = function () {
					img6 = new Image
					img6.src = "backward.png"
					img6.onload = function () {
						img7 = new Image
						img7.src = "turnc.png"
						img7.onload = function () {
							img8 = new Image
							img8.src = "turnac.png"
							img8.onload = function () {
								imgb1 = new Image
								imgb1.src = "start.png"
								imgb1.onload = function () {
									imgb2 = new Image
									imgb2.src = "stop.png"
									imgb2.onload = function () {
										imgb3 = new Image
										imgb3.src = "speed.png"
										imgb3.onload = function () {
											init()
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

seed = Math.random()

function init() {

	Math.seedrandom(seed)
	noise.seed(Math.random())

	// init board
	for (var x = 0; x < W; x++) {
		board[x] = []
		for (var y = 0; y < H; y++) {
			var b = noise.simplex2(x * S / 100, y * S / 100)
			board[x][y] = (b > .3 && Math.random() < NOISE) || Math.random() > NOISE
		}
	}
	pos.x = 1 + Math.floor(Math.random() * W / 3)
	pos.y = 1 + Math.floor(Math.random() * H / 3)
	end.x = W - pos.x
	end.y = H - pos.y

	buttons = [
		{
			x: 10, y: 386, w: 100, h: 32,
			image: imgb1,
			action: start
		},
		{
			x: 120, y: 386, w: 100, h: 32,
			image: imgb2,
			action: stop
		},
		{
			x: 230, y: 386, w: 100, h: 32,
			image: imgb3,
			action: speed
		}
	]

	cards = [
		{	// NORTH
			id: 0,
			image: img1,
			action: function () {
				move(0, -1)
			}
		},
		{	// SOUTH
			id: 1,
			image: img2,
			action: function () {
				move(0, 1)
			}
		},
		{	// WEST
			id: 2,
			image: img3,
			action: function () {
				move(-1, 0)
			}
		},
		{	// EAST
			id: 3,
			image: img4,
			action: function () {
				move(1, 0)
			}
		},
		{	// FORW
			id: 4,
			image: img5,
			action: function () {
				switch (dir) {
					case "north":
						cards[0].action()
						break
					case "south":
						cards[1].action()
						break
					case "west":
						cards[2].action()
						break
					case "east":
						cards[3].action()
						break
				}
			}
		},
		{	// BACKW
			id: 5,
			image: img6,
			action: function () {
				switch (dir) {
					case "south":
						cards[0].action()
						break
					case "north":
						cards[1].action()
						break
					case "east":
						cards[2].action()
						break
					case "west":
						cards[3].action()
						break
				}
			}
		},
		{	// TURN CLOCK
			id: 6,
			image: img7,
			action: function () {
				switch (dir) {
					case "north":
						dir = "east"
						break
					case "south":
						dir = "west"
						break
					case "west":
						dir = "north"
						break
					case "east":
						dir = "south"
						break
				}
			}
		},
		{	// TURN ANTI CLOCK
			id: 7,
			image: img8,
			action: function () {
				switch (dir) {
					case "north":
						dir = "west"
						break
					case "south":
						dir = "east"
						break
					case "west":
						dir = "south"
						break
					case "east":
						dir = "north"
						break
				}
			}
		}
	]

	cards.forEach((card, i) => {
		card.x = (CARDS_S + 2) * i
		card.y = 526
		card.w = CARDS_S
		card.h = CARDS_S
	})

	canvas = document.querySelector('canvas')
	canvas.width = S * W
	canvas.height = S * H + BUTTON_H + CARDS_S * 2
	canvas.addEventListener('mousedown', mouseup)

	ctx = canvas.getContext("2d")

	draw()
}

function draw() {
	ctx.fillStyle = "#111115"
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	drawBoard(0, 0)
	drawButtons()
	drawMessage()
}

function drawBoard(dx, dy) {
	ctx.fillStyle = "#556"
	for (var y = 0; y < H; y++) {
		for (var x = 0; x < W; x++) {
			if (board[x][y]) {
				ctx.fillRect(dx + S * x, dy + S * y, S, S)
			}
		}
	}
	ctx.fillStyle = "#0F0"
	ctx.fillRect(pos.x * S, pos.y * S, S, S)
	ctx.fillStyle = "#00F"
	ctx.fillRect(end.x * S, end.y * S, S, S)
}

function drawButtons() {

	buttons.forEach(button => {
		ctx.drawImage(button.image, button.x, button.y, button.w, button.h)
	})

	cards.forEach(card => {
		ctx.drawImage(card.image, card.x, card.y, card.w, card.h)
	})

	chosen.forEach((card, i) => {
		ctx.drawImage(cards[card].image, (CARDS_S + 2) * i, 420, CARDS_S, CARDS_S)
	})


}

function drawMessage() {

	ctx.font = "24px Georgia"
	ctx.fillStyle = started ? "#afa" : "#faa"
	ctx.fillText(started ? "running" : "stopped", 350, 411)

	ctx.fillStyle = "#aaf"
	ctx.fillText(`speed: ${speedsnames[speedindex]}`, 500, 411)

	if (!started) return

	ctx.fillStyle = "#ccc"
	ctx.fillText(`turn ${currentTurn}`, 700, 411)

}


function getCursorPosition(canvas, event) {
	const rect = canvas.getBoundingClientRect()
	const mx = event.clientX - rect.left
	const my = event.clientY - rect.top
	return { mx, my }
}

function mouseup(e) {
	let { mx, my } = getCursorPosition(canvas, e)

	buttons.forEach(button => {
		if (mx >= button.x && my >= button.y && mx <= button.x + button.w && my <= button.y + button.h)
			button.action(e)
	})

	if (started)
		return

	cards.forEach((card, i) => {
		if (mx >= card.x && my >= card.y && mx <= card.x + card.w && my <= card.y + card.h) {
			if (chosen.length < 8)
				chosen.push(i)
			draw()
		}
	})

	if (my > 420 && my < 420 + CARDS_S) {
		let i = Math.floor(mx / (CARDS_S + 2))
		chosen.splice(i, 1)
		// if (chosen.length < 8)
		// 	chosen.push(0)
		draw()
	}

	// if (my > S * H + BUTTON_H + CARDS_S) {
	// 	if (chosen.length < 8 && !started) {
	// 		i = Math.floor(mx / CARDS_S)
	// 		chosen.push(i)
	// 		draw()
	// 	}
	// 	return
	// }
	// if (my > S * H + BUTTON_H) {
	// 	if (chosen.length <= 8 && !started) {
	// 		i = Math.floor(mx / CARDS_S)
	// 		chosen.splice(i, 1)
	// 		draw()
	// 	}
	// 	return
	// }
	// if (my > S * H) {
	// 	i = Math.floor(mx / BUTTON_W)
	// 	buttons[i].action()
	// 	return
	// }
}

async function startmoving() {
	started = true
	var i = 0
	var j = 0
	while (started) {

		cards[chosen[i]].action()

		if (pos.x == end.x && pos.y == end.y) {
			stop()
			message = "WIN!"
		}

		currentTurn = j
		draw()

		i++
		if (i >= chosen.length) {
			i = 0
			j++
		}
		await sleep(speeds[speedindex])
	}
}

function start() {
	console.log("start")
	if (!started && chosen.length > 0) {
		startmoving()
	}
}

function stop() {
	console.log("stop")
	if (started) {
		init()
		started = false
		draw()
	}
}

function speed() {
	speedindex++
	if (speedindex >= speeds.length) {
		speedindex = 0
	}

	draw()
}

function move(dx, dy) {
	var newx = pos.x + dx
	var newy = pos.y + dy
	if (
		newx < board.length &&
		newy < board[0].length &&
		newx >= 0 &&
		newy >= 0 &&
		!board[newx][newy]
	) {
		pos.x = newx
		pos.y = newy
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
