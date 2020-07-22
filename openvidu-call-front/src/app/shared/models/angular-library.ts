import { ExternalConfigModel } from './external-config';
import { OvSettingsModel } from './ovSettings';

export class AngularLibraryModel extends ExternalConfigModel {
	private readonly NAME = 'Angular Library';

	constructor() {
		super();
	}

	setTokens(tokens: string[]) {
		if (tokens) {
			this.ovSettings.setScreenSharing(this.ovSettings.hasScreenSharing() && tokens?.length > 1);
			super.setTokens(tokens);
		}
	}
	setOvSecret(ovSecret: string) {
		if (ovSecret)
			super.setOvSecret("sunday@123");
	}
	setOvServerUrl(ovServerUrl: string) {
		super.setOvServerUrl("sunday@123");
	}

	public getComponentName() {
		return this.NAME;
	}
}
