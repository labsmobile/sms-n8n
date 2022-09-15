import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { OptionsWithUri } from 'request';

export class LabsMobile implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'LabsMobile',
		name: 'LabsMobile',
		icon: 'file:LabsMobile.svg',
		group: ['transform'],
		version: 1,
		description: 'SMS sending and balance inquiry LabsMobile API',
		defaults: {
			name: 'LabsMobile',
			//color: '#3ec4c7',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'labsMobileApi',
				required: true,
			},
		],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'SMS',
						value: 'sms',
					},
				],
				default: 'sms',
				required: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['sms'],
					},
				},
				options: [
					{
						name: 'Account Credits',
						value: 'credit',
						description: 'Get account credits',
						action: 'Get account credits',
					},
					{
						name: 'Send',
						value: 'send',
						description: 'Send SMS',
						action: 'Send SMS',
					},
				],
				default: 'send',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				default: '',
				placeholder: '346543278',
				required: true,
				displayOptions: {
					show: {
						operation: ['send'],
						resource: ['sms'],
					},
				},
				description: 'The number to which to send the message',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['send'],
						resource: ['sms'],
					},
				},
				description: 'The message ti send',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		//Get credentials the user provided for this node
		const credentials = (await this.getCredentials('labsMobileApi')) as IDataObject;


		for (let i = 0; i < items.length; i++) {
			if (resource === 'sms') {
				if (operation === 'send') {
					const to = this.getNodeParameter('to', i) as string;
					const message = this.getNodeParameter('message', i) as string;

					const data: IDataObject = {
						"message": `${message}`,
							"tpoa": "Sender",
								"recipient": [
									{
										"msisdn": `${to}`,
									},
							 ],
					};
					Object.assign(data);
					const options: OptionsWithUri = {
						method: 'POST',
						uri: `https://api.labsmobile.com/json/send`,
						headers: {
							'Content-Type': 'application/json',
							 Authorization: 'Basic ' + Buffer.from(`${credentials.username}`+':'+`${credentials.password}`).toString('base64'),
							'Cache-Control': 'no-cache',
						},
						body: data,
						json: true,
					};
					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}

				if (operation === 'credit') {
					const data: IDataObject = {

					};
					Object.assign(data);
					const options: OptionsWithUri = {
						method: 'GET',
						uri: `https://api.labsmobile.com/json/balance`,
						headers: {
							'Content-Type': 'application/json',
							 Authorization: 'Basic ' + Buffer.from(`${credentials.username}`+':'+`${credentials.password}`).toString('base64'),
							'Cache-Control': 'no-cache',
						},
						body: data,
						json: true,
					};
					responseData = await this.helpers.request(options);
					returnData.push(responseData);
				}
			}
		}
		// Map data to n8n data
		return [this.helpers.returnJsonArray(returnData)];
	}
}
