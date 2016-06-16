package org.sharelost;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.client.RestTemplate;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest("server.port=8083")
public class LandingPageControllerTest {

	private RestTemplate restTemplate = new TestRestTemplate();

	@Test
	public void indexTest() {
		ResponseEntity<String> entity = 
				restTemplate.getForEntity("http://localhost:8083/", String.class);

		assertThat(entity.getStatusCode().is2xxSuccessful()).isTrue();
		assertThat(entity.getBody()).isEqualTo("Index page ShareLost");
	}
}
