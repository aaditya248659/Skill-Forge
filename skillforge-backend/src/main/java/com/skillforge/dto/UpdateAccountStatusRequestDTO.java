package com.skillforge.dto;

import com.skillforge.enums.AccountStatus;

import jakarta.validation.constraints.NotNull;

public class UpdateAccountStatusRequestDTO {
	
	@NotNull(message = "Account status is required")
	private AccountStatus accountStatus;

	public UpdateAccountStatusRequestDTO() {
		super();
	}

	public AccountStatus getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(AccountStatus accountStatus) {
		this.accountStatus = accountStatus;
	}
}
