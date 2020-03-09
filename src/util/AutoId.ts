namespace util {
	/**
	 * 自动生成ID
	 */
	export class AutoId {
		public newId: number = 0;

		public constructor(id: number = 0) {
			this.newId = id;
		}

		public get id(): number {
			this.newId++;
			return this.newId
		}
	}
}