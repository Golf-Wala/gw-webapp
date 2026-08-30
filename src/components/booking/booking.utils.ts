export const MAX_ADVANCE_DAYS = 30;

export function toDateInputValue(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function maxBookableDate() {
	const d = new Date();
	d.setDate(d.getDate() + MAX_ADVANCE_DAYS);
	return toDateInputValue(d);
}

export function formatTime(iso: string) {
	return new Date(iso).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
	});
}

export function formatDateTime(iso: string) {
	return new Date(iso).toLocaleString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
	});
}
