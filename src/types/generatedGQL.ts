/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSecretContract
// ====================================================

export interface GetSecretContract_secretContracts {
  __typename: "SecretContract";
  /**
   *  Equals to: <taskId> 
   */
  id: string;
  /**
   *  Contract address 
   */
  address: any;
  /**
   *  Deployed bytecode hash 
   */
  codeHash: any;
  /**
   *  Initial state delta hash as a result of the contract's constructor 
   */
  initStateDeltaHash: any;
  /**
   *  Creation timestamp as seconds 
   */
  createdAt: any;
  /**
   *  Creation block number 
   */
  createdAtBlock: any;
  /**
   *  Creation transaction hash 
   */
  createdAtTransaction: any;
}

export interface GetSecretContract {
  secretContracts: GetSecretContract_secretContracts[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SecretContractDetail
// ====================================================

export interface SecretContractDetail {
  __typename: "SecretContract";
  /**
   *  Equals to: <taskId> 
   */
  id: string;
  /**
   *  Contract address 
   */
  address: any;
  /**
   *  Deployed bytecode hash 
   */
  codeHash: any;
  /**
   *  Initial state delta hash as a result of the contract's constructor 
   */
  initStateDeltaHash: any;
  /**
   *  Creation timestamp as seconds 
   */
  createdAt: any;
  /**
   *  Creation block number 
   */
  createdAtBlock: any;
  /**
   *  Creation transaction hash 
   */
  createdAtTransaction: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
