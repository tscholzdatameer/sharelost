package org.sharelost;

import org.sharelost.user.Admin;
import org.sharelost.user.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class SpringDataJpaUserDetailsService implements UserDetailsService {

	private final AdminRepository _repository;

	@Autowired
	public SpringDataJpaUserDetailsService(AdminRepository repository) {
		_repository = repository;
	}

	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		Admin admin = _repository.findByName(name);
		return new User(admin.getName(), admin.getPassword(), AuthorityUtils.createAuthorityList(admin.getRoles()));
	}

}
