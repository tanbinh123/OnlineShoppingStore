package com.example.demo.service;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepo;

@Service
public class UserService {
	
	@Autowired
	UserRepo repo;
	
	public User findUserByUsername(String username) {
		
		try {
		List<User> list= repo.findByUsername(username);
		
		for(User x: list) {
			
			if(x.getUsername().equals(username)) {
				
				return x;
			}
			else {return null;}
			
		}
		
		}catch (Exception e) {
		    return null;
		}
		
		return null;
	}
	
	
	public boolean AddUser(String username, String fname, String lname, String address, String cnumber, String usertype,
			String bday,String password,String email) {
		
		try {
			
		     User user= findUserByUsername(username);
		     
		     if(user!=null) {
		    	 return false;
		     }
			
			User newuser= new User(username, fname, lname, address, cnumber, usertype, bday,password,email);
			
			repo.save(newuser);
			
			return true;
		}catch (Exception e) {
			return false;
		}
		
	}
	
	
	public boolean Login(String username,String password) {
		
		try {
			User user= findUserByUsername(username);
			
			if(user==null)
				return false;
			
			return new BCrypt().checkpw(password, user.getPassword());
		}catch (Exception e) {
			return false;
		}
		
		
	}
	
	public List<User> getAllUsers(){
		
		return repo.findAll();
	}
	

}
