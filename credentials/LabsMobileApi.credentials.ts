import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class LabsMobileApi implements ICredentialType {
	name = 'labsMobileApi';
	displayName = 'LabsMobile API';
	documentationUrl = 'https://apidocs.labsmobile.com/';
	genericAuth = true;
	properties: INodeProperties[] = [
		{
			displayName: 'User Name',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Token API',
			name: 'token',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}
