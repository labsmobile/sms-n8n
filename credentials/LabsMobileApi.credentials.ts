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
			displayName: 'Password or Token',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	/*
	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		const encodedApiKey = Buffer.from(credentials.username + ':' + credentials.password).toString('base64');
		requestOptions.headers!['Content-Type'] = 'application/json';
		requestOptions.headers!['Authorization'] = `Basic ${encodedApiKey}`;
		requestOptions.headers!['Cache-Control'] = 'no-cache';
		return requestOptions;
	}

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.labsmobile.com',
			url: '/json/send',
			method: 'POST',
		},
	};*/
	//const encodedApiKey = Buffer.from(credentials.username + ':' + credentials.password).toString('base64');
	/*/authenticate: IAuthenticateGeneric = {

		type: 'generic',
		properties: {
			headers: {
				Authorization: 'Basic ' +Buffer.from('{{$credentials.username}:{$credentials.password}}').toString('base64'),
			},
		},
	};*/


 /*
	test: ICredentialTestRequest = {
		request: {
			//baseURL: 'https://api.labsmobile.com/json/send',
			url: 'https://api.labsmobile.com/json/send',
		},
	};*/
}
