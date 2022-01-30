window.addEventListener("DOMContentLoaded",app);
function app() {
	var form = document.querySelector("form"),
		imgUpload = document.getElementById("img_upload"),
		imgName = document.getElementById("img_name"),
		color1 = document.getElementById("color1"),
		color2 = document.getElementById("color2"),
		swapColorsBtn = document.getElementById("swap-colors"),
		download = document.getElementById("download"),
		canvas = document.querySelector("canvas"),
		c = canvas.getContext("2d"),
		img = null,
		adjustCanvas = () => {
			// restrict image size
			let imgWidth = canvas.width,
				imgHeight = canvas.height,
				sideLimit = 1024;

			if (img) {
				imgWidth = img.width;
				imgHeight = img.height;
			}
			// keep it proportional
			if (imgWidth >= imgHeight) {
				if (imgWidth >= sideLimit) {
					imgWidth = sideLimit;
					imgHeight = imgWidth * (img.height / img.width);
				}
			} else {
				if (imgHeight >= sideLimit) {
					imgHeight = sideLimit;
					imgWidth = imgHeight * (img.width / img.height);
				}
			}
			// update canvas
			c.clearRect(0,0,canvas.width,canvas.height);
			canvas.width = imgWidth;
			canvas.height = imgHeight;

			if (img)
				c.drawImage(img,0,0,imgWidth,imgHeight);
		},
		imgUploadValid = () => {
			let files = imgUpload.files,
				fileIsThere = files.length > 0,
				isImage = files[0].type.match("image.*"),
				valid = fileIsThere && isImage;

			return valid;
		},
		handleImgUpload = e => {
			return new Promise((resolve,reject) => {
				let target = !e ? imgUpload : e.target;
				if (target.files.length) {
					let reader = new FileReader();
					reader.onload = e2 => {
						img = new Image();
						img.src = e2.target.result;
						img.onload = () => {
							resolve();
						};
						img.onerror = () => {
							img = null;
							reject("由于文件损坏或文件类型错误，图像已被取消。");
						};
						imgName.placeholder = target.files[0].name;
					};
					reader.readAsDataURL(target.files[0]);
				}
			});
		},
		hexToRGB = h => {
			let r = 0,
				g = 0,
				b = 0;
			// 3 digits
			if (h.length == 4) {
				r = "0x" + h[1] + h[1];
				g = "0x" + h[2] + h[2];
				b = "0x" + h[3] + h[3];
			// 6 digits
			} else if (h.length == 7) {
				r = "0x" + h[1] + h[2];
				g = "0x" + h[3] + h[4];
				b = "0x" + h[5] + h[6];
			}

			return {r: +r, g: +g, b: +b};
		},
		RGBToHSL = (R,G,B) => {
			let r = R / 255,
				g = G / 255,
				b = B / 255,
				cmin = Math.min(r,g,b),
				cmax = Math.max(r,g,b),
				delta = cmax - cmin,
				hue = 0,
				sat = 0,
				light = 0;
			// get hue
			if (delta == 0)
				hue = 0;
			else if (cmax == r)
				hue = ((g - b) / delta) % 6;
			else if (cmax == g)
				hue = (b - r) / delta + 2;
			else
				hue = (r - g) / delta + 4;

			hue = Math.round(hue * 60);

			if (hue < 0)
				hue += 360;
			// get lightness and saturation
			light = (cmax + cmin) / 2;
			sat = delta == 0 ? 0 : delta / (1 - Math.abs(2 * light - 1));

			sat = Math.round(sat * 100);
			light = Math.round(light * 100);

			return {h: hue, s: sat, l: light};
		},
		HSLToRGB = (H,S,L) => {
			let s = S / 100,
				l = L / 100,
				c = (1 - Math.abs(2 * l - 1)) * s,
				x = c * (1 - Math.abs((H / 60) % 2 - 1)),
				m = l - c/2,
				r = 0,
				g = 0,
				b = 0;

			if (0 <= H && H < 60) {
				r = c; g = x; b = 0;

			} else if (60 <= H && H < 120) {
				r = x; g = c; b = 0;

			} else if (120 <= H && H < 180) {
				r = 0; g = c; b = x;

			} else if (180 <= H && H < 240) {
				r = 0; g = x; b = c;

			} else if (240 <= H && H < 300) {
				r = x; g = 0; b = c;

			} else if (300 <= H && H < 360) {
				r = c; g = 0; b = x;
			}

			r = Math.round((r + m) * 255);
			g = Math.round((g + m) * 255);
			b = Math.round((b + m) * 255);

			return {r: r, g: g, b: b};
		},
		render = () => {
			adjustCanvas();

			let imgData = c.getImageData(0,0,canvas.width,canvas.height),
				data = imgData.data,
				color1ToRGB = hexToRGB(color1.value),
				color2ToRGB = hexToRGB(color2.value);

			for (let i = 0; i < data.length; i += 4) {
				let inHSL = RGBToHSL(data[i],data[i + 1],data[i + 2]),
					BWLight = Math.round(inHSL.l / 100),
					newR = 0,
					newG = 0,
					newB = 0;

				if (BWLight) {
					newR = color1ToRGB.r;
					newG = color1ToRGB.g;
					newB = color1ToRGB.b;

				} else {
					newR = color2ToRGB.r;
					newG = color2ToRGB.g;
					newB = color2ToRGB.b;
				}

				data[i] = newR;
				data[i + 1] = newG;
				data[i + 2] = newB;
			}
			c.putImageData(imgData,0,0);
		},
		renderPromise = e => {
			handleImgUpload(e).then(() => {
				if (imgUploadValid())
					render();
					
			}).catch(msg => {
				console.log(msg);
			});
		},
		starterImg = src => {
			img = new Image();
			img.src = src;
			img.setAttribute("crossOrigin","anonymous");
			img.onload = e => {
				render();
			};
		},
		swapColors = () => {
			let a = color1.value;
				b = color2.value;

			color1.value = b;
			color2.value = a;
			render();
		};

	imgUpload.addEventListener("change",renderPromise);
	color1.addEventListener("change",render);
	color2.addEventListener("change",render);
	swapColorsBtn.addEventListener("click",swapColors);
	download.addEventListener("click",function(e){
		let dlData = canvas.toDataURL("image/png");
		this.href = dlData;
	});

	// deal with preserved input or start with a sample image
	if (imgUpload.value != "")
		renderPromise();
	else
		starterImg("img/j.jpg");
}